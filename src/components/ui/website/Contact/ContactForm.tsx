import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <section className="w-full section">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-10 items-center overflowhidden">
        {/* Left Image */}
        <div className="w-full h-[300px] md:h-[650px]">
          <Image
            src="https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
            alt="Woman listening to music"
            width={800}
            height={50}
            className="rounded-2xl object-cover w-full h-full"
          />
        </div>

        {/* Right Form */}
        <div className="bg-[#FFF8F3] rounded-2xl p-8 md:p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Our mission is to create a seamless platform where artists can easily promote their music 
            and influencers can earn by sharing music they love.
          </p>

          <form className="space-y-5">
            {/* Name */}
            <Input
              type="text"
              placeholder="Name *"
              className="rounded-full h-14 px-6 text-gray-700 bg-white border-gray-300"
            />

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Email"
                className="rounded-full h-14 px-6 text-gray-700 bg-white border-gray-300"
              />
              <Input
                type="text"
                placeholder="Phone"
                className="rounded-full h-14 px-6 text-gray-700 bg-white border-gray-300"
              />
            </div>

            {/* Message */}
            <Textarea
              placeholder="Write your message"
              className="rounded-2xl px-6 py-4 text-gray-700 bg-white border-gray-300 h-40"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-16 rounded-full text-lg bg-orange-500 hover:bg-orange-600 text-white"
            >
              SEND
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
