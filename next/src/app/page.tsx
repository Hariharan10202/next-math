import Container from "@/components/Container";
import ChartLayout from "@/components/Distribution/ChartLayout";
import Heading from "@/components/Heading";
import CentralTendency from "@/components/Measure/CentralTendency";
import Dispersion from "@/components/Measure/Dispersion";

const Page = () => {
  return (
    <Container className="font-poppins font-bold w-full flex flex-col">
      <div>
        <Heading label="Probability of distribution" />
        <ChartLayout />
      </div>
      <div className="w-full flex gap-x-5 flex-col sm:flex-row justify-between">
        <div className="flex-1">
          <Heading label="Measure of central tendency" />
          <div className="w-full">
            <CentralTendency />
          </div>
        </div>
        <div className="flex-1">
          <Heading label="Measure of dispersion" />
          <Dispersion />
        </div>
      </div>
    </Container>
  );
};

export default Page;
