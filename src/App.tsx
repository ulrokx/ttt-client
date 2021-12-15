import { Gameboard } from "./components/Gameboard";
import { RightArea } from "./components/RightArea";
import { LayoutColumns } from "./styled/LayoutColumns";
import { PageWrapper } from "./styled/PageWrapper";
import { TitleText } from "./styled/Text";
import { UserContextProvider } from "./utils/UserContext";
function App() {
    return (
        <div className="App">
          <UserContextProvider>
            <LayoutColumns>
                <PageWrapper>
                    <TitleText>Tic-Tac-Toe</TitleText>
                    <Gameboard />
                </PageWrapper>
                <PageWrapper>
                  <RightArea />
                </PageWrapper>
            </LayoutColumns>
            </UserContextProvider>
        </div>
    );
}

export default App;
