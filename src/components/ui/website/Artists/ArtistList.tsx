import React from 'react'
import ArtistCard from '@/components/shared/ArtistCard';

const ArtistList = () => {
    return (
        <div>
            <div>
                <h1 className="title text-center mb-3">
                    Star <span className="text-primary">Creator</span> You’ll Love
                </h1>
                <p className="textPara text-center max-w-6xl mx-auto">
                    Explore our handpicked campaigns that are driving real impact,
                    inspiring communities, and shaping the future.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:mt-20">
                {mediaData.map((data) => (              
                <ArtistCard data={data} />              
            ))}
            </div>
        </div>
    )
}

export default ArtistList

// Your static data
const mediaData = [
  { id: 1, title: "Feel the Vibe", creator: "Palash Musical", avatarColor: "bg-purple-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-purple-500/50" },
  { id: 2, title: "Midnight Drive", creator: "Jett Beats", avatarColor: "bg-orange-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-orange-500/50" },
  { id: 3, title: "Electric Dreams", creator: "Luna Synths", avatarColor: "bg-pink-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-pink-500/50" },
  { id: 4, title: "Rhythm Nation", creator: "Diva Drops", avatarColor: "bg-red-700", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-red-700/50" },
  { id: 5, title: "Acoustic Flow", creator: "Aqua Guitar", avatarColor: "bg-teal-600", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-teal-600/50" },
  { id: 6, title: "Deep Focus", creator: "Chilled Clouds", avatarColor: "bg-indigo-400", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-indigo-400/50" },

  // New 10 items
  { id: 7, title: "Ocean Echoes", creator: "Waveform Lab", avatarColor: "bg-blue-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-blue-500/50" },
  { id: 8, title: "Bass Booster", creator: "Rex Soundz", avatarColor: "bg-yellow-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-yellow-500/50" },
  { id: 9, title: "Skyline Nights", creator: "Metro Voices", avatarColor: "bg-cyan-600", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-cyan-600/50" },
  { id: 10, title: "Golden Hour", creator: "Sunny Strings", avatarColor: "bg-amber-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-amber-500/50" },
  { id: 11, title: "Mystic Beats", creator: "Aura Tone", avatarColor: "bg-rose-600", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-rose-600/50" },
  { id: 12, title: "Neon Pulse", creator: "Pixel Waves", avatarColor: "bg-lime-600", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-lime-600/50" },
  { id: 13, title: "Retro Vibes", creator: "Vintage Vinyl", avatarColor: "bg-fuchsia-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-fuchsia-500/50" },
  { id: 14, title: "Horizon Chill", creator: "Dreamscape FM", avatarColor: "bg-sky-500", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-sky-500/50" },
  { id: 15, title: "Urban Beatline", creator: "Street Melody", avatarColor: "bg-neutral-700", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-neutral-700/50" },
  { id: 16, title: "Velocity Rush", creator: "DriveCore", avatarColor: "bg-green-600", imageUrl: "/images/artistPhoto.png", hoverColor: "shadow-green-600/50" },
];

