import { db } from '../firebase_config';
import { collection, addDoc, getDocs, query, orderBy, Timestamp, where, doc, runTransaction } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const storage = getStorage();
const auth = getAuth();

const updateStatistics = async (userId, disease, confidence) => {
  const statsRef = doc(db, 'statistics', userId);
  
  try {
    await runTransaction(db, async (transaction) => {
      const statsDoc = await transaction.get(statsRef);
      
      if (!statsDoc.exists()) {
        // Create new statistics document
        transaction.set(statsRef, {
          totalPredictions: 1,
          diseases: {
            [disease]: {
              count: 1,
              totalConfidence: confidence,
              averageConfidence: confidence,
            }
          },
          overallAverageConfidence: confidence,
          lastUpdated: Timestamp.now(),
        });
      } else {
        const data = statsDoc.data();
        const diseases = { ...data.diseases };
        
        // Update disease statistics
        if (diseases[disease]) {
          const diseaseStats = diseases[disease];
          const newCount = diseaseStats.count + 1;
          const newTotalConfidence = diseaseStats.totalConfidence + confidence;
          
          diseases[disease] = {
            count: newCount,
            totalConfidence: newTotalConfidence,
            averageConfidence: newTotalConfidence / newCount,
          };
        } else {
          diseases[disease] = {
            count: 1,
            totalConfidence: confidence,
            averageConfidence: confidence,
          };
        }

        // Update overall statistics
        const totalPredictions = data.totalPredictions + 1;
        const overallTotalConfidence = data.overallAverageConfidence * (totalPredictions - 1) + confidence;
        
        transaction.update(statsRef, {
          totalPredictions,
          diseases,
          overallAverageConfidence: overallTotalConfidence / totalPredictions,
          lastUpdated: Timestamp.now(),
        });
      }
    });
  } catch (error) {
    console.error('Error updating statistics:', error);
    throw error;
  }
};

export const predictDisease = async (imageBlob) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    console.log('User ID:', user.uid);
    // Convert blob to base64 for prediction
    const reader = new FileReader();
    const base64Promise = new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(imageBlob);
    });
    const base64Image = await base64Promise;

    // Call prediction API (Assuming this API returns { result: 'diseaseName', confidence: 0.xx })
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Prediction API request failed:', response.status, errorBody);
      throw new Error(`Prediction API request failed with status ${response.status}`);
    }

    const predictionResult = await response.json(); // e.g., { result: "Apple Scab", confidence: 0.95 }

    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const filename = `${timestamp}.jpg`;
    
    // Firebase Storage path (current structure: users/{userId}/predictions/{diseaseFolder}/{filename})
    // You might want to align this with Flutter's new storage path: users/{userId}/{sanitizedDiseaseName}/{filename}
    // For now, keeping web's existing storage structure unless specified otherwise.
    const diseaseFolder = predictionResult.result.toLowerCase().replace(/\s+/g, '_');
    const storagePathForFirebase = `users/${user.uid}/predictions/${diseaseFolder}/${filename}`;
    
    // Upload image to Firebase Storage
    const storageRef = ref(storage, storagePathForFirebase);
    await uploadBytes(storageRef, imageBlob);
    
    // Get the download URL
    const imageUrl = await getDownloadURL(storageRef);

    // Prepare data for Firestore, according to the new structure
    const diagnosisData = {
      userId: user.uid, // Though redundant as it's part of the path, good for queries
      imageUrl: imageUrl,
      storagePath: storagePathForFirebase, // Path in Firebase Storage
      diseaseName: predictionResult.result, // Renamed from 'prediction'
      confidence: predictionResult.confidence,
      timestamp: Timestamp.now(), // Firestore server timestamp
      platform: 'web',
      recommendation: '', // Placeholder for recommendation - to be implemented
      // userEmail: user.email, // Optional: if you still need it directly in the doc
    };

    // Save prediction data to Firestore under the new path
    // users/{userId}/diagnosis/{newDiagnosisId}
    const diagnosisCollectionRef = collection(db, 'users', user.uid, 'diagnosis');
    const docRef = await addDoc(diagnosisCollectionRef, diagnosisData);
    console.log('Collection path:', diagnosisCollectionRef.path);

    // Update statistics (This function might need review if it depends on the old 'predictions' collection structure)
    // For now, assuming it primarily works with userId and disease details.
    await updateStatistics(user.uid, predictionResult.result, predictionResult.confidence);

    return {
      id: docRef.id, // ID of the new document in the 'diagnosis' sub-collection
      diseaseName: predictionResult.result,
      confidence: predictionResult.confidence,
      imageUrl: imageUrl,
      // ... any other data from predictionResult you want to return to the UI
    };
  } catch (error) {
    console.error('Error in predictDisease (web):', error);
    throw error;
  }
};

export const getPredictionHistory = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Query the 'diagnosis' subcollection under the specific user's document
    const diagnosisHistoryRef = collection(db, 'users', user.uid, 'diagnosis');
    
    const q = query(
      diagnosisHistoryRef,
      orderBy('timestamp', 'desc')
      // If you want to filter only for web predictions, you could add:
      // where('platform', '==', 'web')
      // For now, it fetches all documents in the user's 'diagnosis' subcollection.
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure timestamp is converted to JS Date object if it's a Firestore Timestamp
        timestamp: data.timestamp && data.timestamp.toDate ? data.timestamp.toDate() : data.timestamp,
      };
    });
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const statsDoc = await getDocs(doc(db, 'statistics', user.uid));
    
    if (!statsDoc.exists()) {
      return {
        totalPredictions: 0,
        diseases: {},
        overallAverageConfidence: 0,
      };
    }

    return statsDoc.data();
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
}; 