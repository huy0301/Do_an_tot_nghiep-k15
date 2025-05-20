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

    const q = query(
      collection(db, 'prediction_history'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    }));
  } catch (error) {
    console.error('Error getting prediction history:', error);
    throw error;
  }
};

export const deletePrediction = async (predictionId) => {
  try {
    await deleteDoc(doc(db, 'prediction_history', predictionId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting prediction:', error);
    throw error;
  }
}; 