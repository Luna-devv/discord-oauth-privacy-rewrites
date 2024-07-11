import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Pause } from "./components/pause";
import { ScopeList } from "./components/scope-list";

export default function App() {
    return (
        <div className="space-y-5">
            <Header />
            <ScopeList />
            <Pause />
            <Footer />
        </div>
    );
}