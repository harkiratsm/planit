"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const cardData = [
  {
    title: "Organize Your Tasks Effortlessly",
    description: "PlanIt helps you stay on top of your day by organizing tasks into lists, categories, and priorities. With PlanIt, you can schedule reminders, set deadlines, and break your goals into manageable steps to ensure nothing falls through the cracks.",
    imageSrc: "/organize_tasks.png",
    imageAlt: "Task organization in PlanIt"
  },
  {
    title: "Collaborate Seamlessly with Teams",
    description: "With PlanIt Pro, you can invite team members to collaborate on projects, assign tasks, and track progress in real-time. Experience enhanced productivity with shared boards, notifications, and easy task delegation features that keep everyone aligned.",
    imageSrc: "/team_collaboration.png",
    imageAlt: "Team collaboration in PlanIt"
  },
];

type FeatureCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};


const FeatureCard = ({ title, description }:FeatureCardProps ) => (
  <Card className="w-full max-w-md mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="pb-4 overflow-hidden">
      <div className="relative w-full h-48 mb-4">
        {/* <Image 
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"              
        /> */}
      </div>
      <CardTitle className="text-xl font-bold text-center">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 text-center">
        {description}
      </p>
    </CardContent>
  </Card>
);

export const HeroSection = () => {
  return (
    <section className="container w-full mx-auto">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> Personal Profile features is out ! </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Stay organized with  
              <span className="px-2 text-primary">
                all your tasks
              </span>  
              in one place.
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`PlanIt is a task management app that helps you organize tasks, collaborate with teams, and track progress in real-time. `}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href="https://planit-web.vercel.app/signin" target="_blank">

            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              Get Started
              <ArrowRight className="size-5 ml-2 group-hover/arrow:-translate-x-1 transition-transform" />
            </Button>

            </Link>

            {/* <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                target="_blank"
                href="https://github.com/harkiratsm/huddle"
              >
                <StarIcon className="size-5 mr-2" />
                Star Us 
              </Link>
            </Button> */}
          </div>
        </div>
          <div className="relative group mt-10">
          <div className="flex flex-col md:flex-row gap-10">
            {cardData.map((card, index) => (
              <FeatureCard key={index} {...card} />
            ))}
          </div>
        </div>         
      </div>
    </section>
  );
};
