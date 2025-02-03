import HeroSection from "../components/HeroSection"
import CategoryCarousel from "../components/Carousel"
import JobListings from "../components/Latestjobs"

function Home() {
  return (
    <main>
      <HeroSection/>
    {/* Category Carousel Section */}
    <section className="py-12">
        <CategoryCarousel />
    </section>

    {/* Job Listings Section */}
    <section className="py-12">
        <JobListings />
    </section>
</main>
  )
}

export default Home