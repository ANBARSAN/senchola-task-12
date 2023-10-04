import { appRouter } from "./Router/AppRouter";
import { RouterProvider } from "react-router-dom";
import { Provider} from "react-redux";
import { store } from './store/store';

//2.add store provider 

function App() {
  return (
    <Provider store={store}>
    <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
