import "./App.css";
import { TwitterFollowingCard } from "./TwitterFollowingCard";

export function App() {
  return (
    // <div>
    //   <h1>Twitter Card</h1>
    // </div>
    <div className="App">
      <TwitterFollowingCard
        isFollowing
        userName="cacarotoMejia421"
        name="Cacaroto Josue Mejia"
      />
      <TwitterFollowingCard
        isFollowing={false}
        userName="carajihno"
        name="Tona Victoria Cere"
      />
      <TwitterFollowingCard
        isFollowing
        userName="vicky"
        name="vicky Tonita Cere"
      />
      <TwitterFollowingCard
        isFollowing={false}
        userName="Xiom"
        name="Xiomista Victoria Cere"
      />
    </div>
  );
}
