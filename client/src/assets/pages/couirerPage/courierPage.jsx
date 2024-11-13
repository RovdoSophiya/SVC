import CourierMain from "../_components/courierMain/courierMain";

const Courier = (user, userRole, userId, loading) => {
  return (
    <div>
      <CourierMain
        user={user}
        userRole={userRole}
        userId={userId}
        loading={loading}
      />
    </div>
  );
};

export default Courier;
