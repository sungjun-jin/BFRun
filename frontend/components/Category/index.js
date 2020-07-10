// external modules
import styled, { css } from 'styled-components';

// internal modules
// import LangToggle from './LangToggle';

const Category = ({
  contentList,
  selectedContent,
  addDelContentTags,
  stackList,
  selectedStack,
  addDelStackTags,
  creatorList,
  selectedCreator,
  addDelCreatorTags,
}) => {
  return (
    <>
      <CategoryWrap>
        <CategoryContainer>
          {/* <LangToggle /> */}
          <GroupContainer>
            <Title>Contents</Title>
            <AllTags>
              {contentList.map((type) => {
                return (
                  <Tag
                    key={type.id}
                    id={type.id}
                    style={{
                      backgroundColor: selectedContent.includes(type.name)
                        ? 'green'
                        : 'white',
                      color: selectedContent.includes(type.name)
                        ? 'white'
                        : 'black',
                    }}
                    onClick={() => addDelContentTags(type.name, type.id)}
                  >
                    {type.name}
                  </Tag>
                );
              })}
            </AllTags>
          </GroupContainer>
          <Line />
          <GroupContainer>
            <Title>FrontEnd</Title>
            <AllTags>
              {stackList[1].frontend_stacks.map((type) => {
                return (
                  <Tag
                    key={type.id}
                    id={type.id}
                    style={{
                      backgroundColor: selectedStack.includes(type.name)
                        ? type.color_code
                        : 'white',
                      color: selectedStack.includes(type.name)
                        ? 'white'
                        : 'black',
                    }}
                    onClick={() => addDelStackTags(type.name, type.id)}
                  >
                    {type.name}
                  </Tag>
                );
              })}
            </AllTags>
          </GroupContainer>
          <GroupContainer>
            <Title>BackEnd</Title>
            <AllTags>
              {stackList[2].backend_stacks.map((type) => {
                return (
                  <Tag
                    key={type.id}
                    id={type.id}
                    style={{
                      backgroundColor: selectedStack.includes(type.name)
                        ? type.color_code
                        : 'white',
                      color: selectedStack.includes(type.name)
                        ? 'white'
                        : 'black',
                    }}
                    onClick={() => addDelStackTags(type.name, type.id)}
                  >
                    {type.name}
                  </Tag>
                );
              })}
            </AllTags>
          </GroupContainer>
          <GroupContainer>
            <Title>Developer</Title>
            <AllTags>
              {stackList[0].general_stacks.map((type) => {
                return (
                  <Tag
                    key={type.id}
                    id={type.id}
                    style={{
                      backgroundColor: selectedStack.includes(type.name)
                        ? type.color_code
                        : 'white',
                      color: selectedStack.includes(type.name)
                        ? 'white'
                        : 'black',
                    }}
                    onClick={() => addDelStackTags(type.name, type.id)}
                  >
                    {type.name}
                  </Tag>
                );
              })}
            </AllTags>
          </GroupContainer>
          <GroupContainer>
            <Title>Creator</Title>
            <AllTags>
              {creatorList.map((type) => {
                return (
                  <Tag
                    key={type.id}
                    id={type.id}
                    style={{
                      backgroundColor: selectedCreator.includes(type.name)
                        ? '#F80000'
                        : 'white',
                      color: selectedCreator.includes(type.name)
                        ? 'white'
                        : 'black',
                    }}
                    onClick={() => addDelCreatorTags(type.name, type.id)}
                  >
                    {type.name}
                  </Tag>
                );
              })}
            </AllTags>
          </GroupContainer>
          <GroupContainer>
            <Title wecode>아직 프론트인지 백인지 모르겠다면?</Title>
            <TextLink href="http://bftest.wecode.co.kr/" target="_blank">
              BF-Test 하러가기!
            </TextLink>
          </GroupContainer>
          <GroupContainer>
            <Title wecode>부트캠프를 찾고 계신다면?</Title>
            <a href="https://wecode.co.kr/" target="_blank">
              <WecodeImg src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/logo/logo_black.png" />
            </a>
          </GroupContainer>
        </CategoryContainer>
      </CategoryWrap>
    </>
  );
};

export default Category;

const CategoryWrap = styled.aside`
  display: block;
  @media ${(props) => props.theme.laptopM} {
    display: none;
  }
`;

const CategoryContainer = styled.div`
  width: 240px;
  border: 1px solid #e4e9ed;
  border-radius: 7px;
  background-color: white;
`;

const GroupContainer = styled.div`
  margin: 30px 0 30px 10px;
`;

const Line = styled.div`
  width: 100%;
  border: 1px solid #ececec;
  margin: -10px auto;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #2d2d2d;
  ${(props) =>
    props.wecode &&
    css`
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 0;
    `}
`;

const AllTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0px;
`;

const Tag = styled.div`
  background-color: white;
  border: 1px solid #eee;
  color: #333;
  font-size: 14px;
  border-radius: 3px;
  padding: 8px;
  font-weight: 700;
  margin: 5px 3px;
  cursor: pointer;
`;

const WecodeImg = styled.img`
  cursor: pointer;
  width: 100px;
  height: auto;
  margin-top: 15px;
`;

const TextLink = styled.a`
  cursor: pointer;
  font-weight: bold;
  color: #2d2d2d;
  display: block;
  margin-top: 15px;
`;
