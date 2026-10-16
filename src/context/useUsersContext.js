
import { useContext } from "react";
import UsersContext from "./UsersContext";

export default function useUsersContext() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(
      "useUsersContext must be used inside UsersProvider"
    );
  }

  return context;
}
