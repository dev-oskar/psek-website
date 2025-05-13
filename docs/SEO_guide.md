# Przewodnik po polach SEO w TinaCMS

## Wprowadzenie

Ten przewodnik wyjaśnia, jak prawidłowo wypełniać pola SEO (Search Engine Optimization) podczas tworzenia lub edycji treści w TinaCMS. Poprawne wykorzystanie tych pól pomoże zwiększyć widoczność strony w wyszukiwarkach i zapewni lepsze doświadczenie użytkownikom korzystającym z mediów społecznościowych.

## Dostępne pola SEO

W każdej kolekcji treści (patient, business, medical, research, pages) dostępne są następujące pola związane z SEO:

### Podstawowe pola

| Pole            | Opis                             | Zalecana długość | Przykład                                                                                                    |
| --------------- | -------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **title**       | Tytuł strony/artykułu (wymagany) | 50-60 znaków     | "Kannabinoidy w leczeniu bólu przewlekłego"                                                                 |
| **description** | Krótki opis zawartości           | 120-160 znaków   | "Kompleksowy przegląd aktualnych badań dotyczących skuteczności kannabinoidów w leczeniu bólu przewlekłego" |

### Pola SEO

| Pole                 | Opis                                                             | Zalecana długość         | Przykład                                                                                                 |
| -------------------- | ---------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| **meta_title**       | Tytuł używany w meta tagach                                      | 50-60 znaków             | "Kannabinoidy w leczeniu bólu przewlekłego \| PSEK"                                                      |
| **meta_description** | Opis używany w meta tagach i udostępnieniach społecznościowych   | 120-160 znaków           | "Aktualny przegląd badań klinicznych dotyczących zastosowania kannabinoidów w terapii bólu przewlekłego" |
| **featured_image**   | Zdjęcie główne (wyświetlane w udostępnieniach społecznościowych) | Minimum 1200x630 pikseli | /images/example.jpg                                                                                      |

## Jak wypełniać pola SEO

### 1. Tytuł (meta_title)

- Używaj słów kluczowych istotnych dla treści
- Dodawaj nazwę strony/organizacji (np. "\| PSEK")
- Zachowaj unikalność dla każdej strony
- Nie przekraczaj 60 znaków (idealnie 50-55)

❌ **Źle**: "Kannabinoidy w leczeniu"  
✅ **Dobrze**: "Kannabinoidy w leczeniu bólu przewlekłego \| PSEK"

### 2. Opis (meta_description)

- Zwięźle podsumuj zawartość strony
- Używaj słów kluczowych naturalnie wplecionych w tekst
- Zachęcaj do kliknięcia, ale unikaj clickbaitu
- Nie przekraczaj 160 znaków (idealnie 120-155)

❌ **Źle**: "Informacje o kannabinoidach"  
✅ **Dobrze**: "Aktualny przegląd badań klinicznych dotyczących zastosowania kannabinoidów w terapii bólu przewlekłego - mechanizmy działania, skuteczność, bezpieczeństwo"

### 3. Obrazek wyróżniający (featured_image)

- Używaj wysokiej jakości obrazów (minimum 1200x630 pikseli)
- Wybieraj obrazy związane tematycznie z treścią
- Upewnij się, że obraz ma dobry kontrast i jest czytelny
- Unikaj nadmiernego tekstu na obrazie

## Podgląd SEO

Podczas edycji treści w TinaCMS nie ma bezpośredniego podglądu SEO. Zalecamy sprawdzenie, jak strona wygląda po opublikowaniu, używając:

1. Narzędzi deweloperskich w przeglądarce (F12 > Elements > `<head>`)
2. Walidatorów meta tagów, np. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. [Google Rich Results Test](https://search.google.com/test/rich-results)

## Automatyczne zachowanie

Jeśli nie wypełnisz niektórych pól SEO, system zachowa się następująco:

- Jeśli `meta_title` jest pusty, zostanie użyty `title`
- Jeśli `meta_description` jest pusty, zostanie użyty `description` (jeśli istnieje)
- Jeśli nie ma obrazka wyróżniającego, w udostępnieniach może zostać użyty domyślny obrazek strony

## Lista kontrolna SEO

Przed opublikowaniem treści upewnij się, że:

- [ ] `title` jest wypełniony i konkretny
- [ ] `meta_title` jest wypełniony lub `title` jest odpowiedni jako meta tag
- [ ] `meta_description` jest wypełniony, informacyjny i zachęcający
- [ ] Wszystkie pola SEO są unikalne dla danej strony
- [ ] Używasz słów kluczowych naturalnie wplecionych w tekst

## Najlepsze praktyki

1. **Słowa kluczowe**: Używaj słów kluczowych odpowiednich dla tematu, ale nie wypełniaj nimi tekstu sztucznie.
2. **Unikalność**: Każda strona powinna mieć unikalny tytuł i opis.
3. **Aktualność**: Aktualizuj meta tagi, gdy zmieniasz zawartość strony.
4. **Prawdziwość**: Upewnij się, że meta tagi dokładnie odzwierciedlają zawartość strony.
5. **Testowanie**: Sprawdzaj, jak Twoje strony wyglądają w wynikach wyszukiwania i mediach społecznościowych.

---

Ten przewodnik został przygotowany przez administratorów strony PSEK. W razie pytań dotyczących SEO lub problemów z wypełnianiem pól, skontaktuj się z nami.
