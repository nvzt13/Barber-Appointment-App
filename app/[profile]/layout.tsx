import SideBar from "./_components/SideBar";

const AdminLaout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
        <SideBar />
      <div className="flex-1 h-full bg-gray-100"> 
        {children}
      </div>
    </div>
  );
};

export default AdminLaout;