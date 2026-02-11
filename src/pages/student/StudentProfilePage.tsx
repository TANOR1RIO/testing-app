import { useState } from "react";
import { LinkIcon } from "../../icon/icons";
import styled from "@emotion/styled";
import ChangeModalPassword from "../../components/ChengeModalPassword";
import { Toast } from "../../components/ui/Toast";

const PageHeader = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #0077cc;
`;

const Section = styled.section`
  display: flex;
  gap: 30px;
`;

const Avatar = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FullName = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

const WorkBadge = styled.span`
  font-size: 21px;
  font-weight: 500;
  color: #0077cc;
  background-color: #e8f5ff;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
`;

const Link = styled.a<{ isHovered: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${(props) => (props.isHovered ? '#0077cc' : '#000')};
  text-decoration: none;
  font-size: 20px;
  transition: color 0.2s;
`;

const GroupsContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GroupItem = styled.li`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 18px;
  display: flex;
  gap: 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
`;

type Group = { code: string; course: string; track: string };
type Socials = { link: string; label: string };

type ProfileData = {
  fullname: string;
  work: string;
  avatarUrl?: string;
  social?: Socials;
  group: Group[];
};
export function StudentProfilePage() {
  const ProfileData: ProfileData = {
    fullname: 'Афигевший Котяра Окакович',
    work: 'КОД',
    avatarUrl: 'https://i.pinimg.com/736x/a8/ad/b3/a8adb3faaad0401520f89298fbf0f098.jpg  ',
    social: { link: "https://vk.com/id276233156  ", label: "vk.com/id276233156" },
    group: [
      { code: '2KF1', course: '2 Курс', track: 'Frontend' },
      { code: '3KF1', course: '3 Курс', track: 'Backend' },
    ],
  };
// Состояние профиля
  const [profile] = useState<ProfileData>(ProfileData);
// Фото если нету некакой другой
  const emptyAva = 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg';
//Ховер эфект для ссылку
  const [isLinkHovered, setIsLinkHovered] = useState(false);
// Видимость модалки
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openToast, setIsOpenToast] = useState(false);

  function onChangePassword() {
    setIsModalOpen(true);
  }

  const avatarSrc = profile.avatarUrl?.trim() ? profile.avatarUrl.trim() : emptyAva;

  return (
    <>
      <PageHeader>Профиль</PageHeader>
      <Section>
        <Avatar src={avatarSrc} alt="ava" />
        <Info>
          <div>
            <FullName>
              {profile.fullname} <WorkBadge>{profile.work}</WorkBadge>
            </FullName>
          </div>
          <div>
            <Link
              href={profile.social?.link?.trim()}
              isHovered={isLinkHovered}
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon /> {profile.social?.label}
            </Link>
          </div>
          <GroupsContainer>
            {profile.group.map((g, i) => (
              <GroupItem key={i}>
                <span>{g.code}</span>
                <span>{g.course}</span>
                <span>{g.track}</span>
              </GroupItem>
            ))}
          </GroupsContainer>
          <Actions>
            <Button>Поменять фото</Button>
            <Button onClick={onChangePassword}>Изменить пароль</Button>
          </Actions>
        </Info>
      </Section>
      <ChangeModalPassword
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsOpenToast(true)}
      />
      <Toast open={openToast} message="Сохранения изменены" onClose={() => setIsOpenToast(false)} />
    </>
  );
}