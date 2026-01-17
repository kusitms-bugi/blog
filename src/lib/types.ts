export interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  description: string;
  date: string;
  content: string;
  author?: string;
  tags?: string[];
  category?: string;
}

// Slug 생성 헬퍼 함수
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // 유니코드 정규화
    .replace(/[\u0300-\u036f]/g, "") // 발음 기호 제거
    .replace(/[^\w\s-]/g, "") // 특수문자 제거 (영문, 숫자, 공백, 하이픈만 유지)
    .replace(/\s+/g, "-") // 공백을 하이픈으로
    .replace(/-+/g, "-") // 연속된 하이픈을 하나로
    .replace(/^-+|-+$/g, ""); // 앞뒤 하이픈 제거
}
