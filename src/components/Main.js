const mission = [
    {
      name: 'Planet Excursions',
      description: 'What will your space adventure be? Choose between great exploration missions and near-base family fun.',
      imageSrc: 'https://live.staticflickr.com/65535/52502432987_e88a47dbb7.jpg',
      imageAlt: 'Person walking on the Moon.',
      href: '#',
    },
    {
      name: 'On Board Activities',
      description: "Getting there is half the fun. There's lots to do on the ship, from spa days to star gaze. Book now to secure your fun.",
      imageSrc: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW50ZXJ0YWlubWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Dining Packages',
      description: 'We have the finest cuisine off-Earth. Your room includes our basic dining package, but make it special with exotic fruits, steaks, and meals around the galaxy!',
      imageSrc: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/09/27/all-the-fruits-cut-whole.jpg.rend.hgtvcom.616.493.suffix/1632778035320.jpeg',
      imageAlt: 'Fruit photo',
      href: '#',
    },
  ]
console.log(mission[1].name)
  export default function Main({setCurrent}) {

    return(
        <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-5 text-center">Mission Preparations</h2>
  
            {/* <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"> */}
            <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              {mission.map((mission) => (
                <div key={mission.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 ">
                    <a href="#" onClick={()=>setCurrent(mission.name)}><img
                      src={mission.imageSrc}
                      alt={mission.imageAlt}
                      className="h-full w-full object-cover object-center"
                    /></a>
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={mission.href}>
                      <span className="absolute inset-0" />
                      {mission.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{mission.description}</p>
                </div>
              ))}
            </div>
            </div>
        </div>
  )}