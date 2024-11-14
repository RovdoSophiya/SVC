import ClientMain from "../_components/clientMain/clientMain";
import Description from "../_components/description/description";

const Client = ({ user, userRole, userId, loading, onLogout }) => {
  return (
    <div>
      <ClientMain
        user={user}
        userRole={userRole}
        userId={userId}
        loading={loading}
        onLogout={onLogout}
      />
      <Description />
    </div>
  );
};

export default Client;
