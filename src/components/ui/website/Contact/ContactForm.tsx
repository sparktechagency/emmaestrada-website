'use client';
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

export default function ContactForm() {

  const handleContact = async (e: any) => {
    e.preventDefault();
    try {
      const form = e.target;
      const data = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
      }
      
      const response = await myFetch("/contacts/send-message", { method: "POST", body: data})
      if(response?.success){            
        toast.success(response?.message)
        form.reset(); // Reset form after successful submission
      }else{
        toast.error(response?.message) // Changed to toast.error
      }
    } catch (error:any) {
      console.log("handleContact", error);
      toast.error(error?.data?.message) // Changed to toast.error
    }
  }

  return (
    <section className="w-full section">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-10 items-center overflow-hidden">
        {/* Left Image - Optimized */}
        <div className="relative w-full h-[300px] md:h-[650px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
            alt="Woman listening to music"
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            priority={false}
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

          <form onSubmit={handleContact} className="space-y-5">
            {/* Name */}
            <Input
              type="text"
              name="name"
              placeholder="Name *"
              required
              className="rounded-full h-14 px-6 text-gray-700 bg-white border-gray-300"
            />

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="rounded-full h-14 px-6 text-gray-700 bg-white border-gray-300"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="rounded-full h-14 px-6 text-gray-700 bg-white border-gray-300"
              />
            </div>

            {/* Message */}
            <Textarea
              name="message"
              placeholder="Write your message"
              required
              className="rounded-2xl px-6 py-4 text-gray-700 bg-white border-gray-300 h-40 resize-none"
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