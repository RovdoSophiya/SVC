import ClientMain from "../_components/clientMain/clientMain";
import Description from "../_components/description/description";

const Client = (user, userRole, userId, loading) => {
  return (
    <div>
      <ClientMain
        user={user}
        userRole={userRole}
        userId={userId}
        loading={loading}
      />
      <Description />
    </div>
  );
};

export default Client;
