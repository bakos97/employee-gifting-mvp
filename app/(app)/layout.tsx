import { Navbar } from '../components/Navbar';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Navbar />
            <main className="flex-1 lg:ml-64 px-4 py-6 pt-16 lg:pt-12 lg:px-12">
                {children}
            </main>
        </div>
    );
}
