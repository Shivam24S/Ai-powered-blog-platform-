const MainHeader = ({ children }) => {
  return (
    <header className="navbar bg-primary text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {children}
      </div>
    </header>
  );
};

export default MainHeader;
