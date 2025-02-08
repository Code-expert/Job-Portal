import HeroSection from "../components/HeroSection"
import CategoryCarousel from "../components/Carousel"
import Latestjobs from "../components/Latestjobs"
import useGetAllJobs from "../hooks/UseGetAlljobs"

function Home() {
  useGetAllJobs();
  return (
    <main>
      <HeroSection/>
    {/* Category Carousel Section */}
    <section className="py-12">
        <CategoryCarousel />
    </section>

    {/* Job Listings Section */}
    <section className="py-12">
        <Latestjobs />
    </section>
</main>
  )
}

export default Home