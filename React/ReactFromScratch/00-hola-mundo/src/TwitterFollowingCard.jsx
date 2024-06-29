export function TwitterFollowingCard({ userName, name, isFollowing }) {
  console.log(isFollowing);
  return (
    <>
      <article className="tw-followCard">
        <header className="tw-followCard-header">
          <img
            className="tw-followCard-avatar"
            alt="Avatar de usuario"
            src="https://unavatar.io/kikobeats?ttl=1h"
          />
          <div className="tw-followCard-info">
            <strong>{name}</strong>
            <span className="tw-followCard-infoUserName">@{userName}</span>
          </div>
        </header>
        <aside>
          <button className="tw-followCard-button">Seguir</button>
        </aside>
      </article>
    </>
  );
}
