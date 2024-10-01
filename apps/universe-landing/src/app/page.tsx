"use client";

import { useEffect } from "react"
import { useLocalStore, observer } from "mobx-react"
import BackgroundContainer from "src/components/BackgroundContainer";

function Home(props: any) {
  const state = useLocalStore(() => ({
    showSun: false as boolean,
    showSaturn: false as boolean,
    showMoon: false as boolean,
    useStarBg: false as boolean,
    showEarth: false as boolean,
  }))

  useEffect(() => {
    setTimeout(() => {
      state.showSun = true;
      state.showSaturn = true;
      state.showMoon = true;
      state.showEarth = true;
    }, 2000)
  }, [])

  return (
    <main className="flex w-screen h-screen overflow-y-auto overflow-x-hidden">
      <BackgroundContainer useSun={state.showSun} showMoon={state.showMoon}
        showSaturn={state.showSaturn} showStarBg={state.useStarBg} showEarth={state.showEarth}
        className="overflow-y-auto overflow-x-hidden flex-col items-center justify-between"
      >
      </BackgroundContainer>
    </main>
  )
}

export default observer(Home)
