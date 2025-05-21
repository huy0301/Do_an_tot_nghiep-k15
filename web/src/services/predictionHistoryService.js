import { db, auth, storage } from '../firebase_config';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const savePrediction = async ({
  plantName,
  diseaseName,
  imageFile,
  confidence,
  platform = 'web'
}) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    // Upload image to Firebase Storage
    const storageRef = ref(storage, `plant_images/${user.uid}/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // Save prediction to Firestore
    const prediction = {
      userId: user.uid,
      plantName,
      diseaseName,
      imageUrl,
      confidence,
      timestamp: new Date(),
      platform
    };

    await addDoc(collection(db, 'prediction_history'), prediction);
    return { success: true };
  } catch (error) {
    console.error('Error saving prediction:', error);
    throw error;
  }
};

export const getPredictionHistory = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    // Updated to query the user-specific 'diagnosis' subcollection
    const diagnosisHistoryRef = collection(db, 'users', user.uid, 'diagnosis');
    const q = query(
      diagnosisHistoryRef,
      orderBy('timestamp', 'desc')
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
    console.error('Error getting prediction history:', error);
    throw error;
  }
};

export const deletePrediction = async (predictionId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated for deletion');

    // Updated to delete from the user-specific 'diagnosis' subcollection
    await deleteDoc(doc(db, 'users', user.uid, 'diagnosis', predictionId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting prediction:', error);
    throw error;
  }
}; 