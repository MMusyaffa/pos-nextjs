import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useContext } from "react";
import { AdminSidebarContext } from "@/utils/contexts";

export default function NavbarAdmin() {
    const router = useRouter();
    const { selectedContent } = useContext(AdminSidebarContext);

    const pageTitles = {
        dashboard: 'Dashboard',
        sales: 'Sales Page',
        histories: 'History Page',
        products: 'Management Menu',
        categories: 'Management Category',
        boardgames: 'Management Board Game',
        users: 'Management User',
        accounts: 'Management Account',
        default: 'Dashboard'
    };

    const currentPage = pageTitles[selectedContent] || pageTitles.default;

    return (
        <div className="pt-5 mr-10">
            <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
                <div className="text-lg font-semibold">
                    {currentPage}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-black py-2 px-4 rounded-lg">
                        Admin John Doe
                    </div>
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/logos/icon-user.png"
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
}
