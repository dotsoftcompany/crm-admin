import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';

const useDelete = (id, collection) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { toast } = useToast();

  const deleteItem = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, collection, id);
      await deleteDoc(docRef);
      toast({
        title: "Muvaffaqiyatli o'chirildi",
      });
    } catch (err) {
      console.log(`Error deleting ${collection}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading, error };
};

export default useDelete;
