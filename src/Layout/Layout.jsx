import Footer from "@/components/Footer/Footer";
import Header from "../components/Header/Header";


const Layout = ({children}) => {
    return (
        <div className="bg-gradient-to-bl from-background to-muted">
                <Header/>
           <main className="min-h-screen container mx-auto px-4 py-8">
           {children} 
           </main>

         <Footer/>
        </div>
    );
};

export default Layout;