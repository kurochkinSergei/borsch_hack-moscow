import { Input } from 'storybook-directual';
import React, { useState, SyntheticEvent } from 'react';

import './index.scss';


interface Props {
  title: string;
  withSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

const PageHeader = ({
  title = '',
  searchPlaceholder = '',
  withSearch = false,
  onSearch = () => {},
}: Props) => {
  const [search, setSearch] = useState('');

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onSearch(target.value);

    setSearch(target.value);
  };

  return (
    <header className="layout-header">
      <div className="header-title-wrapper">
        <div className="Header_32-40_Black title">{title}</div>
        {
          withSearch
          && (
            <div className="search_bar">
              <Input
                // type="search"
                withSearch
                placeholder={searchPlaceholder}
                value={search}
                onChange={onChange}
                // onSearch={this.props.onSearch}
              />
            </div>
          )
        }
      </div>
    </header>
  );
};


export default PageHeader;
