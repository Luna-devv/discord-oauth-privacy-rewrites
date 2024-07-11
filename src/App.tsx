import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { ScopeList } from "./components/scope-list";

export default function App() {
    return (
        <div className="space-y-4">
            <Header />
            <ScopeList />
            <Footer />
        </div>
    );
}