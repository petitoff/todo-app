import jwtDecode from "jwt-decode";

function isTokenValid(access_token: string) {
  try {
    const decodedToken: any = jwtDecode(access_token);

    // Sprawdź, czy token zawiera niezbędne informacje
    if (!decodedToken.exp || !decodedToken.sub) {
      return false;
    }

    // Sprawdź, czy token nie wygasł
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimeInSeconds) {
      return false;
    }

    // Jeśli token spełnia wszystkie warunki, oznacz go jako prawidłowy
    return true;
  } catch (error) {
    // Jeśli wystąpił błąd podczas dekodowania tokena, oznacz go jako nieprawidłowy
    return false;
  }
}

export default isTokenValid;
