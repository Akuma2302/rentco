import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ExplorePage } from "./pages/ExplorePage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { AddItemPage } from "./pages/AddItemPage";
import { MyRentalsPage } from "./pages/MyRentalsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MyListingsPage } from "./pages/MyListingsPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { PaymentPage } from "./pages/PaymentPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "item/:id", element: <ItemDetailPage /> },
      { path: "add-item", element: <AddItemPage /> },
      { path: "my-rentals", element: <MyRentalsPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "my-listings", element: <MyListingsPage /> },
      { path: "edit-profile", element: <EditProfilePage /> },
      { path: "payment/:id", element: <PaymentPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);