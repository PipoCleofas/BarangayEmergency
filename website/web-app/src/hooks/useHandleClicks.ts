import { useGetItems } from "./useGetItems";

export const useHandleClicks = () => {
  const { checkAccounts, error } = useGetItems();

  const handleNavClick = (navigate: (path: string) => void, target: string) => {
    try {
      navigate(target);
      console.log('navigating');
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const onLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    navigate: any,
    username: string,
    password: string
  ) => {
    e.preventDefault();
  
    try {
      const isAdminValid = await checkAccounts('admin', username, password);
  
      if (isAdminValid) {
        navigate('/AdminDashboard'); 
      }
    } catch (error) {
      console.error("Error during login click:", error);
    }
  };

  return {
    onLoginClick,
    handleNavClick,
    error // Return the error state to be used in the AdminLogin component
  };
};
