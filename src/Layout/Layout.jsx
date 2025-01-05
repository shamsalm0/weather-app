import Header from "../components/Header/Header";


const Layout = ({children}) => {
    return (
        <div className="bg-gradient-to-bl from-background to-muted">
                <Header/>
           <main className="min-h-screen container mx-auto px-4 py-8">
           {children} 
           </main>

         <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/80">
         <div className="mx-auto container px-4 text-center text-gray-500">
            footer
           </div>
         </footer>
        </div>
    );
};

export default Layout;