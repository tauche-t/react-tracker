import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IToggle {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function Router({ setToggle }: IToggle) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin setToggle={setToggle} />
        </Route>
        <Route path="/">
          <Coins setToggle={setToggle} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;