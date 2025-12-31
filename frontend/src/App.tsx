import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { LucideVideotape } from "lucide-react"


function App() {
  function buttonfn(text: string) {
    console.log(text)
  }

  return (
    <div className="bg-white min-h-screen p-5">
      <Button text={"Click Me"} startIcon={LucideVideotape} variant="primary" size="sm" onClick={() => buttonfn("btn1")}></Button>
      <div className="p-3"></div>
      <Button text={"Click Me"} startIcon={LucideVideotape} variant="secondary" size="sm" onClick={() => buttonfn("btn1 alt")}></Button>
      <div className="p-3"></div>
      <Button text={"Click Me"} startIcon={LucideVideotape} variant="secondary" size="md" onClick={() => buttonfn("btn2")}></Button>
      <div className="p-3"></div>
      <Button text={"Click Me"} startIcon={LucideVideotape} loading={true} variant="secondary" size="lg" onClick={() => buttonfn("btn3")}></Button>
      <div className="p-3"></div>
      <Card />
    </div >
  )
}

export default App
