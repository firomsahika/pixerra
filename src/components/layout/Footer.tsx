export function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-100 py-12 px-4 md:px-8">
            <div className="max-w-[2000px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">P</div>
                        <span className="text-red-600 text-lg font-bold">Pixerra</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Discover the world's top designers & creatives.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-red-600 mb-4">For Designers</h4>
                    <ul className="flex flex-col gap-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-black">Explore designs</a></li>
                        <li><a href="#" className="hover:text-black">Upload work</a></li>
                        <li><a href="#" className="hover:text-black">Design blog</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-red-600">Company</h4>
                    <ul className="flex flex-col gap-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-black">About</a></li>
                        <li><a href="#" className="hover:text-black">Careers</a></li>
                        <li><a href="#" className="hover:text-black">Support</a></li>
                    </ul>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        &copy; 2026 Pixerra Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
