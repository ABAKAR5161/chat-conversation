

const Conversation = () => {
    return (
        <>
            <div className="flex items-center gap-2 hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
                <div className="avatar online">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">John Doe</p>
                        <p className="text-xl">🤡</p>
                    </div>
                </div>
            </div>
            <div className="divider py-0 my-O h-1"/>
        </>
    );
};

export default Conversation