import { useGetItems } from "./useGetItems";

export const useHandleClicks = () => {
  const { checkAccounts } = useGetItems();

  const handleNavClick = (navigate: (path: string) => void, target: string) => {
    try {
      navigate(target);
      console.log('navigating')
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  

  const onLoginClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    navigate: any
  ) => {
    try {
      e.preventDefault();
      checkAccounts('admin'); 
      handleNavClick(navigate, '/AdminDashboard'); 
    } catch (error) {
      console.error("Error during login click:", error);
    }
  };

  return {
    onLoginClick,
    handleNavClick,
  };
};
