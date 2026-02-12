import { Navbar } from '../components/Navbar';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Navbar />
            <main className="flex-1 ml-64 p-8 lg:p-12">
                {children}
            </main>
        </div>
    );
}
