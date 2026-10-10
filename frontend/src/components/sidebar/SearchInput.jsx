import { IoSearchSharp } from "react-icons/io5";
const SearchInput = () => {
    return (
        <form className="flex w-full items-center gap-2">
            <input type="text" placeholder="Serach..." className="input input-bordered min-w-0 flex-1 rounded-full" />
            <button type="submit" className="btn btn-circle shrink-0 bg-sky-500 text-white">
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </form>
    );
};

export default SearchInput
