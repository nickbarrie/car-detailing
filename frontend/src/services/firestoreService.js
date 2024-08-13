import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../firebase'; // Adjust the path as needed

export async function addBooking(name, email, time, service) {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      name,
      email,
      time,
      service
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function fetchBookings() {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookings = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(data);
        return {
            id: doc.id,
            ...data,
          };
      });
      return bookings;
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
}
  

export async function updateBooking(id, updatedData) {
  try {
    const bookingRef = doc(db, 'bookings', id);
    await updateDoc(bookingRef, updatedData);
    console.log("Document updated successfully");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export async function deleteBookingById(id) {
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (e) {
      console.error("Error deleting booking: ", e);
    }
  }
  
  export async function blockOutTime(start, end) {
    try {
      const blockDoc = {
        startTime: new Date(start),
        endTime: new Date(end),
      };
      await addDoc(collection(db, 'blockedTimes'), blockDoc);
    } catch (e) {
      console.error("Error blocking out time: ", e);
    }
  }
  
