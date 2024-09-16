const Index = props => {
  console.log(props);
  return (
    <>
      <h1>ユーザ一覧</h1>
      <ul>
        {props.users.map(user => (
          <>
            <li key={user.id}>{user.display_name}</li>
            <li key={user.id}>{user.email}</li>
            <li key={user.id}>{user.created_at}</li>
          </>
        ))}
      </ul>
    </>
  );
};

export default Index;
