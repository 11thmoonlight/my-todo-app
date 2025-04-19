import { useEffect, useState } from "react";
import { getLists } from "@/lib/yourFile"; // مسیر درست فایل رو وارد کن

// تعریف نوع List
type List = {
  id: string;
  name: string;
  [key: string]: any; // اگر فیلدهای بیشتری وجود داره
};

interface MyComponentProps {
  userId: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ userId }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists(userId);
        setLists(data);
      } catch (error) {
        console.error("خطا در دریافت لیست‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLists();
    }
  }, [userId]);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>{list.name}</div>
      ))}
    </div>
  );
};

export default MyComponent;
