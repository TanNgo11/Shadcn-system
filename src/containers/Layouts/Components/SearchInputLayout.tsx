import { BaseColor } from '@/components/BaseColor';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Input, theme } from 'antd';

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: BaseColor.backgroundLight,
          border: `1px solid ${BaseColor.borderLight}`,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: BaseColor.gray600,
            }}
          />
        }
        placeholder="Search"
        variant="borderless"
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};
export default SearchInput;
