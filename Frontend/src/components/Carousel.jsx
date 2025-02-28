    import { useRef } from "react";
    import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchQuery } from "../store/jobSlice";

    function CategoryCarousel() {
        const categories = ["Fullstack Developer", "Data Science", "Graphic Designer", "Frontend Developer", "Cloud Enginner", "Design", "Engineering", "Healthcare"];
        const scrollContainer = useRef(null);

        const scroll = (direction) => {
            if (scrollContainer.current) {
                const scrollAmount = 250; // Adjust scrolling speed
                scrollContainer.current.scrollBy({ left: direction === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
            }
        };

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const jobSearchHandler = (query) => {
        dispatch(setsearchQuery(query));
        navigate("/browse");
        
        }


        return (
            <div className="flex flex-col items-center mt-10 w-full">
                <h2 className="text-2xl font-bold mb-6">Job Categories</h2>

                <div className="relative flex items-center w-full max-w-2xl">
                    {/* Previous Button */}
                    <button
                        onClick={() => scroll("prev")}
                        className="absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-md"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Scrollable Category List */}
                    <div 
                        ref={scrollContainer} 
                        className="flex gap-4 overflow-x-auto scroll-smooth px-12 no-scrollbar"
                    >
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => jobSearchHandler(cat)}
                                className="min-w-max px-5 py-2 border border-gray-600 rounded-full hover:bg-gray-200 transition cursor-pointer"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */} 
                    <button
                        onClick={() => scroll("next")}
                        className="absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-md"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>
        );
    }

    export default CategoryCarousel;
