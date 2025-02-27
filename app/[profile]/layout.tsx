import { auth } from "@/auth";
import SideBar from "./_components/SideBar";

const AdminLaout = async ({ children }: { children: React.ReactNode }) => {
   const getServerSideProps = async () => {
    const session = await auth()
     console.log(session?.user.id)
    try {
      const res = await fetch(`http://localhost:3000/api/user?userId=${session?.user?.id}`);
      if (res.ok) {
        const props = await res.json();
        return props;
      } else {
        console.log("API hatası:");
        return null;
      }
    } catch (error) {
      console.log("Sunucu hatası:", error);
      return null;
    }
  };

  const  isAdmin  = await getServerSideProps();

  return (
    <div className="flex w-full h-screen items-center justify-center">
        <SideBar isAdmin={isAdmin} />
      <div className="flex-1 h-full bg-gray-100"> 
        {children}
      </div>
    </div>
  );
};

export default AdminLaout;