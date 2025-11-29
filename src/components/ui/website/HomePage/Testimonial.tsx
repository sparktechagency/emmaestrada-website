import Container from '@/components/shared/Container';
import TestimonialCarousel from '@/components/shared/TestimonialCarousel';


// ------------------------------------
// Main Component
// ------------------------------------


// Wrapper App component to allow for necessary styling and context
const Testimonial = () => (
    <Container>
        <div className="">
        <div>
            <h1 className="title text-center mb-3">
                Voices of Our <span className="text-primary">Fans</span>
            </h1>
            <p className=" textPara text-center max-w-6xl mx-auto">
                Explore our handpicked campaigns that are driving real impact, inspiring communities,
            </p>
        </div>
        <div className="w-full md:w-4/5 mx-auto mt-10 ">
        <div className="bg-secondary p-2 md:p-4 w-full md:w-4/5 mx-auto sm:p-10 rounded-2xl ">
            <TestimonialCarousel />
        </div>
        </div>
        </div>
    </Container>
);

export default Testimonial;

