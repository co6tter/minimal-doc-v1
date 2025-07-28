"use client";

import { NavigationItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

interface NavigationTreeProps {
  items: NavigationItem[];
  className?: string;
}

interface NavigationNodeProps {
  item: NavigationItem;
  currentPath: string;
  level?: number;
}

function NavigationNode({ item, currentPath, level = 0 }: NavigationNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = currentPath === item.href;
  const isInCurrentPath = currentPath.startsWith(item.href) && item.href !== "";

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li className={clsx("relative", level > 0 && "ml-4")}>
      <div
        className={clsx(
          "flex items-center py-2 px-3 rounded-md text-sm transition-colors",
          isActive
            ? "bg-blue-50 text-blue-700 font-medium"
            : isInCurrentPath
              ? "text-blue-600"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
          hasChildren && "cursor-pointer",
        )}
        onClick={hasChildren && !item.href ? handleToggle : undefined}
      >
        {hasChildren && (
          <button
            className="mr-2 p-0.5 hover:bg-gray-200 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}

        {item.href ? (
          <Link
            href={item.href}
            className={clsx(
              "flex-1 truncate",
              hasChildren && "ml-0",
              !hasChildren && "ml-6",
            )}
            title={item.description || item.title}
          >
            {item.title}
          </Link>
        ) : (
          <span
            className={clsx(
              "flex-1 truncate font-medium",
              hasChildren && "ml-0",
              !hasChildren && "ml-6",
            )}
            title={item.description || item.title}
          >
            {item.title}
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul className="mt-1 space-y-1">
          {item.children!.map((child, index) => (
            <NavigationNode
              key={child.href || `${child.title}-${index}`}
              item={child}
              currentPath={currentPath}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function NavigationTree({ items, className }: NavigationTreeProps) {
  const pathname = usePathname();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={clsx("navigation-tree", className)}>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <NavigationNode
            key={item.href || `${item.title}-${index}`}
            item={item}
            currentPath={pathname}
          />
        ))}
      </ul>
    </nav>
  );
}
