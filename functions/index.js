import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// Scheduled function to reset 'isPaid' field
export const resetIsPaidMonthly = functions.pubsub
  .schedule('0 0 1 * *')
  .onRun(async (context) => {
    const studentsRef = db.collection('students');
    const snapshot = await studentsRef.get();
    const batch = db.batch();

    snapshot.forEach((doc) => {
      batch.update(doc.ref, { isPaid: false });
    });

    await batch.commit();
    console.log('isPaid reset for all students');
    return null;
  });
