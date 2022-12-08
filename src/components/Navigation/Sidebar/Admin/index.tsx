import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { clearTokens, history } from 'utils';
import { setProfile } from 'features/user/userSlice';
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarData } from './data';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [toggled, setToggled] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleToggleSidebar = (value: boolean) => {
    setToggled(value);
  };

  const handleCollapseSidebar = () => {
    setCollapsed(!collapsed);
  };
  const logout = () => {
    clearTokens();
    dispatch(setProfile({}));
    history.push('/login/password');
  };
  return (
    <React.Fragment>
      <ProSidebar
        breakPoint='md'
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div className='top-bar'>
            <div id='bars_button' className='bars_button' onClick={handleCollapseSidebar}>
              <Link to='#' title='Menu'>
                <FontAwesomeIcon icon={faBars} />
              </Link>
              <span>Hieq - Panel</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape='circle'>
            {SidebarData.map((item, key) => {
              if (isEmpty(item.subMenu)) {
                return (
                  <MenuItem key={key} icon={<FontAwesomeIcon icon={item.icon!} />}>
                    {item.title}
                    {item.path && <Link to={item.path} />}
                  </MenuItem>
                );
              } else {
                return (
                  <SubMenu
                    key={key}
                    title={item.title}
                    icon={<FontAwesomeIcon icon={item.icon!} />}
                  >
                    {item.subMenu &&
                      item.subMenu.map((subItem, subKey) => {
                        return (
                          <MenuItem key={subKey}>
                            {subItem.title}
                            {subItem.path && <Link to={subItem.path} />}
                          </MenuItem>
                        );
                      })}
                  </SubMenu>
                );
              }
            })}
          </Menu>
        </SidebarContent>
        <SidebarFooter className='text-center'>
          {/* <div className='top-bar'> */}
          <button type='button' className='btn text-center' style={{ color: "white" }} onClick={() => logout()}>Logout</button>
          {/* </div> */}
        </SidebarFooter>
      </ProSidebar>
    </React.Fragment>
  );
};

export default Sidebar;
