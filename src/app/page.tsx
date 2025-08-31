import HeroHome from '@/components/nextsaas/sections/HeroHome'
import HomeServices from '@/components/nextsaas/sections/HomeServices'
import HomeWhoItWork from '@/components/nextsaas/sections/HomeWhoItWork'
import HomeFeatured from '@/components/nextsaas/sections/HomeFeatured'
export default function Page() {
  return (
    <>
      <HeroHome />
      {/* contenido debajo del hero... */}
      <HomeServices />
      <HomeWhoItWork />
      <HomeFeatured />
    </>
  )
}